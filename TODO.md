# TODO: Fix Bugs in Mandatory Quiz Code

## Step 1: Add new endpoint to get current question for ongoing quiz
- Add `getCurrentQuestion` function in `mandatoryQuizController.js`
- Add route `/current/:quizId` in `mandatoryQuizRoutes.js`

## Step 2: Update MandatoryQuiz.jsx to fetch first question correctly
- Replace the incorrect post in `fetchFirstQuestion` with call to new `/current/:quizId` endpoint

## Step 3: Add type filter in submitAnswer for next questions
- Update the query in `submitAnswer` to include `type: 'mandatory'`

## Step 4: Populate questionId in submitAnswer completion
- Use `.populate('questions.questionId')` when saving and returning completion data

## Step 5: Add completeQuiz endpoint
- Add `completeQuiz` function in `mandatoryQuizController.js` to force completion
- Add route `/complete/:quizId` in `mandatoryQuizRoutes.js`

## Step 6: Update handleEndQuiz to force completion if not done
- Modify `handleEndQuiz` in `MandatoryQuiz.jsx` to call complete endpoint if quiz not completed
