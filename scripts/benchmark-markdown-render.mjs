import '@angular/compiler';
import { performance } from 'node:perf_hooks';
import { MarkdownRenderService } from '../dist/ngx-mkd/fesm2022/ngx-mkd.mjs';

const service = new MarkdownRenderService();

function makeMarkdown({ sections, codeBlocks, mermaidBlocks, formulasPerSection }) {
    const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(12);
    const jsCode = [
        'function fib(n) {',
        '  if (n <= 1) return n;',
        '  return fib(n - 1) + fib(n - 2);',
        '}',
        'console.log(fib(10));'
    ].join('\n');
    const pyCode = [
        'def normalize(values):',
        '    total = sum(values)',
        '    return [v / total for v in values]',
        '',
        'print(normalize([1, 2, 3]))'
    ].join('\n');
    const mermaid = ['graph TD', 'A[Start] --> B{Check}', 'B -->|Yes| C[Done]', 'B -->|No| D[Retry]'].join('\n');

    const chunks = ['# Benchmark Document'];
    for (let sectionIndex = 0; sectionIndex < sections; sectionIndex++) {
        chunks.push(`## Section ${sectionIndex + 1}`);
        chunks.push(paragraph + paragraph);

        for (let formulaIndex = 0; formulaIndex < formulasPerSection; formulaIndex++) {
            chunks.push(`Inline: $E = mc^${(sectionIndex % 5) + 2}$`);
            chunks.push('$$\\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}$$');
        }
    }

    for (let codeBlockIndex = 0; codeBlockIndex < codeBlocks; codeBlockIndex++) {
        const language = codeBlockIndex % 2 === 0 ? 'javascript' : 'python';
        const body = codeBlockIndex % 2 === 0 ? jsCode : pyCode;
        chunks.push('```' + language + '\n' + body + '\n```');
    }

    for (let mermaidIndex = 0; mermaidIndex < mermaidBlocks; mermaidIndex++) {
        chunks.push('```mermaid\n' + mermaid + '\n```');
    }

    return chunks.join('\n\n');
}

function percentile(values, percentileValue) {
    const sorted = [...values].sort((left, right) => left - right);
    const index = Math.ceil((percentileValue / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
}

function runScenario(name, markdown, iterations = 15, warmups = 3) {
    const inputBytes = Buffer.byteLength(markdown, 'utf8');
    const times = [];
    let outputBytes = 0;

    for (let warmupIndex = 0; warmupIndex < warmups; warmupIndex++) {
        service.render(markdown);
    }

    if (global.gc) {
        global.gc();
    }
    const heapBefore = process.memoryUsage().heapUsed;

    for (let iterationIndex = 0; iterationIndex < iterations; iterationIndex++) {
        const start = performance.now();
        const html = service.render(markdown);
        const end = performance.now();

        times.push(end - start);
        outputBytes = Buffer.byteLength(html, 'utf8');
    }

    if (global.gc) {
        global.gc();
    }
    const heapAfter = process.memoryUsage().heapUsed;

    const avgMs = times.reduce((sum, value) => sum + value, 0) / times.length;
    const p95Ms = percentile(times, 95);
    const p99Ms = percentile(times, 99);
    const throughputMBps = (inputBytes / (1024 * 1024)) / (avgMs / 1000);

    return {
        name,
        inputKB: +(inputBytes / 1024).toFixed(1),
        outputKB: +(outputBytes / 1024).toFixed(1),
        avgMs: +avgMs.toFixed(2),
        p95Ms: +p95Ms.toFixed(2),
        p99Ms: +p99Ms.toFixed(2),
        throughputMBps: +throughputMBps.toFixed(2),
        heapDeltaMB: +((heapAfter - heapBefore) / (1024 * 1024)).toFixed(3)
    };
}

const scenarios = [
    {
        name: 'text-heavy ~150KB',
        markdown: makeMarkdown({ sections: 180, codeBlocks: 4, mermaidBlocks: 0, formulasPerSection: 0 })
    },
    {
        name: 'mixed-code ~320KB',
        markdown: makeMarkdown({ sections: 200, codeBlocks: 280, mermaidBlocks: 12, formulasPerSection: 0 })
    },
    {
        name: 'mixed-code+math ~500KB',
        markdown: makeMarkdown({ sections: 220, codeBlocks: 320, mermaidBlocks: 15, formulasPerSection: 1 })
    },
    {
        name: 'stress ~1.3MB',
        markdown: makeMarkdown({ sections: 520, codeBlocks: 900, mermaidBlocks: 30, formulasPerSection: 1 })
    }
];

const results = scenarios.map((scenario) => runScenario(scenario.name, scenario.markdown));

console.table(results);

const worstP95 = Math.max(...results.map((result) => result.p95Ms));
const avgThroughput = results.reduce((sum, result) => sum + result.throughputMBps, 0) / results.length;

console.log('\nSummary');
console.log(`- Worst p95 latency: ${worstP95.toFixed(2)} ms`);
console.log(`- Mean throughput: ${avgThroughput.toFixed(2)} MB/s`);
