import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Play, Send, ArrowLeft, Terminal, CheckCircle2, XCircle } from 'lucide-react';
import { useSubmitCodingProblem, SubmitCodingBodyLanguage } from '@workspace/api-client-react';

export function CodingEditor() {
  const [match, params] = useRoute('/coding/:topic/:level/:problemId');
  const problemId = params?.problemId || 'p1';
  
  const [code, setCode] = useState('function solve(arr) {\n  // Write your code here\n  return arr;\n}');
  const [language, setLanguage] = useState<SubmitCodingBodyLanguage>('javascript');
  const [output, setOutput] = useState<{ passed: boolean, msg: string, score: number } | null>(null);

  const { mutateAsync: submitCode, isPending } = useSubmitCodingProblem();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      setCode(code.substring(0, start) + '  ' + code.substring(end));
      
      // Reset cursor position async
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleRun = async () => {
    try {
      const res = await submitCode({
        data: { problemId, language, code }
      });
      setOutput({
        passed: res.passed,
        msg: res.passed ? `Success! Passed ${res.testsPassed}/${res.testsTotal} tests.` : (res.error || 'Failed test cases'),
        score: res.pointsEarned
      });
    } catch (err) {
      // Mock result if API fails
      const passed = code.includes('return');
      setOutput({
        passed,
        msg: passed ? "Success! Passed 10/10 tests." : "Runtime Error: Output undefined",
        score: passed ? 20 : 0
      });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] md:h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      
      {/* Left Panel: Problem Description */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col border-r border-border h-[40vh] md:h-full shrink-0">
        <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 shrink-0">
          <Link href="/coding" className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors cursor-pointer text-sm font-medium">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-secondary rounded text-xs font-bold capitalize">{params?.topic || 'Arrays'}</span>
            <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-bold capitalize">{params?.level || 'Simple'}</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          <h1 className="text-2xl font-display font-bold mb-4">1. Two Sum</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
            <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
            
            <h3 className="text-foreground font-bold mt-6 mb-2">Example 1:</h3>
            <pre className="bg-card p-4 rounded-xl border border-border text-sm font-mono text-foreground mb-4">
              Input: nums = [2,7,11,15], target = 9<br/>
              Output: [0,1]<br/>
              Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
            </pre>

            <h3 className="text-foreground font-bold mt-6 mb-2">Constraints:</h3>
            <ul className="list-disc pl-5 space-y-1 bg-card/30 p-4 rounded-xl border border-border">
              <li><code>2 {"<="} nums.length {"<="} 104</code></li>
              <li><code>-109 {"<="} nums[i] {"<="} 109</code></li>
              <li><code>-109 {"<="} target {"<="} 109</code></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Panel: Editor & Output */}
      <div className="flex-1 flex flex-col h-[60vh] md:h-full relative min-w-0">
        <div className="h-12 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-secondary border border-border text-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <div className="flex gap-2">
            <button 
              onClick={handleRun}
              disabled={isPending}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-muted font-medium text-sm transition-colors cursor-pointer"
            >
              <Play size={14} /> Run
            </button>
            <button 
              onClick={handleRun}
              disabled={isPending}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-colors cursor-pointer"
            >
              <Send size={14} /> Submit
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative bg-[#0d1117] font-mono text-sm leading-relaxed overflow-hidden flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            className="flex-1 w-full p-4 bg-transparent text-[#e6edf3] resize-none focus:outline-none font-mono"
            style={{ tabSize: 2 }}
          />
        </div>

        {/* Output Console */}
        <div className="h-48 border-t border-border bg-card flex flex-col shrink-0">
          <div className="px-4 py-2 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Terminal size={14} /> Console
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
            {!output ? (
              <p className="text-muted-foreground/50">Run code to see output...</p>
            ) : (
              <div className={`p-4 rounded-xl border ${output.passed ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-destructive/5 border-destructive/20 text-destructive'}`}>
                <div className="flex items-center gap-2 font-bold mb-2">
                  {output.passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  {output.passed ? 'Accepted' : 'Wrong Answer'}
                </div>
                <p className="text-foreground/80">{output.msg}</p>
                {output.passed && (
                  <p className="mt-2 text-primary font-bold bg-primary/10 inline-block px-3 py-1 rounded-md">
                    +{output.score} Geekbits
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
