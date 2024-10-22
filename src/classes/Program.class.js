class Program {
  constructor({ value }) {
    this.value = value;
    this.validateProgram();
  }

  validateProgram() {
    if (!this.value) {
      throw new Error('Missing required fields for program');
    }
  }
}

export default Program;
