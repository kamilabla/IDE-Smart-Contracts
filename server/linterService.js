import { exec } from 'child_process';
import express from 'express';

const router = express.Router();

// Endpoint do analizy kodu
router.post('/lint', (req, res) => {
  const { sourceCode } = req.body;

  exec(`echo "${sourceCode}" | npx solhint --stdin --formatter json`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }

    const lintResults = JSON.parse(stdout);
    res.json(lintResults);
  });
});

export default router;
