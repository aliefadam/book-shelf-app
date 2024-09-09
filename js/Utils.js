class Utils {
  static saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  }

  static showNotification({ title, text, icon }) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

  static showConfirmation({ text }, confirmedCallback) {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Yakin!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmedCallback();
      }
    });
  }
}

export default Utils;
