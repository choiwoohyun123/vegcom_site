function GetDays(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60 / 60 / 24) + 1;

    return betweenTime;
}

export default GetDays;
