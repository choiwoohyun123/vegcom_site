function TierDecision(point) {
    let tier = [0, '단계', '/0단계'];

    if (point < 14000) {
        tier[0] = 0;
        tier[1] = '0단계';
        tier[2] = './0단계.png';
    } else if (point < 60000) {
        tier[0] = 1;
        tier[1] = '1단계';
        tier[2] = './1단계.png';
    } else if (point < 180000) {
        tier[0] = 2;
        tier[1] = '2단계';
        tier[2] = './2단계.png';
    } else if (point < 360000) {
        tier[0] = 3;
        tier[1] = '3단계';
        tier[2] = './3단계.png';
    } else if (point < 720000) {
        tier[0] = 4;
        tier[1] = '4단계';
        tier[2] = './4단계.png';
    } else {
        tier[0] = 5;
        tier[1] = '5단계';
        tier[2] = './5단계.png';
    }
    return tier;
}

export default TierDecision;
