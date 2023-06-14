

exports.dateformatter = (date) => {
    const createdAt = new Date(date);

    const formattedDate = {
      date: createdAt.getDate(),
      month: createdAt.toLocaleString("en-US", { month: "short" }),
      year: createdAt.getFullYear(),
      hour: createdAt.getHours(),
      minute: createdAt.getMinutes(),
      period: createdAt.getHours() >= 12 ? "PM" : "AM",
    };

    formattedDate.hour = formattedDate.hour % 12 || 12;

    formattedDate.minute = formattedDate.minute.toString().padStart(2, "0");


    return formattedDate;
    }