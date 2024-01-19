class CommonRequest {
  id: string;

  projectID: string;

  action: string;

  /**
   * @deprecated
   */
  requestID: string;

  constructor(id: string, projectID: string, action: string, requestID: string) {
    this.id = id;
    this.projectID = projectID;
    this.action = action;
    this.requestID = requestID;
  }
}

export default CommonRequest;
