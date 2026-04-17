const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'question.txt');
const outputFile = path.join(__dirname, 'src', 'assets', 'questions.json');

try {
  const data = fs.readFileSync(inputFile, 'utf8');
  const blocks = data.split('\n\n').map(b => b.trim()).filter(b => b !== '');
  
  const questions = [];

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
    if (lines.length < 6) continue;

    const weekMatch = lines[0].match(/Week:\s*(\d+)/i);
    const questionMatch = lines[1].match(/Question:\s*(.*)/i);
    
    // Sometimes the question spans multiple lines or the options are different
    // Let's find options and answer safely
    let answerMatch = null;
    let answerChar = null;
    let options = [];
    let weekIndex = weekMatch ? parseInt(weekMatch[1], 10) : 0;
    let questionText = questionMatch ? questionMatch[1] : '';

    for (let i = 2; i < lines.length; i++) {
      if (lines[i].startsWith('Answer:')) {
        answerMatch = lines[i].match(/Answer:\s*([A-Za-z])/i);
        if (answerMatch) answerChar = answerMatch[1].toUpperCase();
      } else if (/^[A-Za-z]\)/.test(lines[i])) {
        options.push(lines[i]);
      } else if (!answerChar && options.length === 0) {
        // Line continuation of question
        questionText += ' ' + lines[i];
      }
    }

    if (questionText && options.length > 0 && answerChar) {
      // Find the index of the correct option
      const correctAnswerIndex = options.findIndex(opt => opt.startsWith(`${answerChar})`));
      
      questions.push({
        week: weekIndex,
        questionText,
        options,
        correctAnswerIndex
      });
    }
  }

  // Ensure output dir exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2));
  console.log(`Successfully parsed ${questions.length} questions to questions.json`);
} catch (error) {
  console.error('Error parsing questions:', error);
}
