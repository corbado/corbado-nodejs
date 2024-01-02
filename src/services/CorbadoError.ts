// convert this file to typescript (.ts) and add types
class CorbadoError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "CorbadoError";
  }
}

export default CorbadoError;
