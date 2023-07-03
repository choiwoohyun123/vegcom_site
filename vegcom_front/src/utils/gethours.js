function GetHours(value) {
    const today = new Date();
    const timeValue = new Date(value);
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60 / 60);

    if (betweenTime >= 48) {
        return false;
    } else return true;
}

export default GetHours;
