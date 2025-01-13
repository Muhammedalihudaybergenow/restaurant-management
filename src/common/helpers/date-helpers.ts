export class DateHelpers {
  static currentTime(): number {
    return new Date().getTime();
  }
  static getFileDate() {
    const date = new Date();
    return date.getFullYear() + '-' + date.getMonth();
  }
}
