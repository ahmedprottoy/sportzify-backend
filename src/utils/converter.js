

exports.dateformatter = (date) => {
    const createdAt = new Date(date);

    const formattedDate = {
      date: createdAt.getDate(),
      month: createdAt.toLocaleString("en-US", { month: "short" }),
      year: createdAt.getFullYear(),
    };
    return formattedDate;
    }