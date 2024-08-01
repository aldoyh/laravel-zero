class AlSaryaGameClass {
    constructor() {
        this.PHOTO_VIEW_WAIT = 10;
        this.TOTAL_QUESTIONS_ROUND = 10;
        this.clockTimeNow = 20;
        this.clockResetTime = this.clockTimeNow;
        this.mainScore = 0;
        this.queCount = 1;
        this.answerClicked = false;
        this.haveData = false;

        this.gameState = new GameState();
        this.uiElements = new UIElements();
        this.soundManager = new SoundManager();
        this.animationManager = new AnimationManager();
        this.questionManager = new QuestionManager();
        this.scoreManager = new ScoreManager(this.uiElements.scorePane);
        this.timerManager = new TimerManager(this.uiElements.mcTimer);
        this.settingsManager = new SettingsManager();

        this.setupEventListeners();
        this.loadSettings();
        this.prepGameSounds();
    }

    setupEventListeners() {
        this.uiElements.startButton.addEventListener('click', () => this.startClicked());
        this.uiElements.menuButton.addEventListener('click', () => this.animationManager.showSideMenu());
        this.uiElements.answerButtons.forEach(button => {
            button.addEventListener('click', (event) => this.optionClicked(event));
        });
    }

    loadSettings() {
        this.settingsManager.loadSettings(settings => {
            this.applySettings(settings);
            this.questionManager.loadQuestions();
        });
    }

    startClicked() {
        this.mainScore = 0;
        this.scoreManager.resetScore();
        this.animationManager.playIntroAnimation(() => this.startGame());
    }

    startGame() {
        this.gameState.reset();
        this.animationManager.playGameStartAnimation(() => this.showNextQuestion());
    }

    showNextQuestion() {
        if (this.gameState.currentQuestionIndex < this.TOTAL_QUESTIONS_ROUND) {
            const question = this.questionManager.getNextQuestion();
            this.displayQuestion(question);
            this.timerManager.startTimer(() => this.onTimerComplete());
        } else {
            this.endGame();
        }
    }

    displayQuestion(question) {
        this.uiElements.updateQuestionDisplay(question);
        this.animationManager.playQuestionAnimation();
        if (question.type === 'image') {
            this.showPicture(question.imageUrl);
        } else if (question.type === 'video') {
            this.showVideo(question.videoUrl);
        }
    }

    showPicture(imageUrl) {
        // Implementation for showing picture
    }

    showVideo(videoUrl) {
        // Implementation for showing video
    }

    optionClicked(event) {
        if (this.answerClicked) return;
        this.answerClicked = true;

        const chosenOption = event.target.dataset.option;
        const isCorrect = this.questionManager.checkAnswer(chosenOption);

        if (isCorrect) {
            this.mainScore += this.timerManager.getCurrentTime();
            this.scoreManager.updateScore(this.mainScore);
            this.soundManager.playSound('correct');
        } else {
            this.animationManager.playWrongAnswerAnimation(event.target);
            this.soundManager.playSound('wrong');
        }

        this.animationManager.playRightAnswerAnimation(this.questionManager.getCurrentQuestion().correctAnswer);
        this.timerManager.stopTimer();

        setTimeout(() => {
            this.answerClicked = false;
            this.showNextQuestion();
        }, 1500);
    }

    onTimerComplete() {
        this.showNextQuestion();
    }

    endGame() {
        this.animationManager.playGameOverAnimation(() => {
            console.log("Game Over");
            this.uiElements.showGameOverScreen(this.scoreManager.getScore());
        });
    }

    applySettings(settings) {
        this.TOTAL_QUESTIONS_ROUND = settings.totalQuestions || this.TOTAL_QUESTIONS_ROUND;
        // Apply other settings as needed
    }

    prepGameSounds() {
        this.soundManager.loadSound('ticker', 'path/to/ticker.mp3');
        this.soundManager.loadSound('correct', 'path/to/correct.mp3');
        this.soundManager.loadSound('wrong', 'path/to/wrong.mp3');
        this.soundManager.loadSound('bgMusic', 'path/to/bgMusic.mp3', true);
    }
}

// Other classes (GameState, UIElements, SoundManager, AnimationManager, QuestionManager, ScoreManager, TimerManager, SettingsManager)
// should be updated accordingly to match the functionality in the ActionScript version.

document.addEventListener('DOMContentLoaded', () => {
    new AlSaryaGameClass();
});
