export const getWeek = (day: number) => {
    let result: string = "";
    switch (day) {
        case 0:
            result = '日';
            break;
        case 1:
            result = '月';
            break;
        case 2:
            result = '火';
            break;
        case 3:
            result = '水';
            break;
        case 4:
            result = '木';
            break;
        case 5:
            result = '金';
            break;
        case 6:
            result = '土';
            break;
        default:
            result = '';
            break;
    }
    return result;
}