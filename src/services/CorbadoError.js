class CorbadoError extends Error {
  constructor(message) {
    super(message);
    this.name = "CorbadoError";
  }
}

export default CorbadoError;
