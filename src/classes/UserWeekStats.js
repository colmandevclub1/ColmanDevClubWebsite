class UserWeekStats {
  constructor({ weekRef, userRef, project_status, presnce_status, created_at, updated_at, updated_by }) {
    this.weekRef = weekRef;
    this.userRef = userRef;
    this.project_status = project_status;
    this.presnce_status = presnce_status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.updated_by = updated_by;

    this.validateUserWeekStats();
  }

  validateUserWeekStats() {}
}

export default UserWeekStats;
