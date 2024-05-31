export const types = [
    {name:"Пасажирський",color: '#ea5a47', secondColor:'#ffffff'},
    {name:"Локомотив",color:'#0000ff',secondColor:'#ffffff'},
    {name:"Універсальний",color:'#ffffff',secondColor:'#ea5a47'},
    {name:"Вагон-цистерна",color:'#ffff00',secondColor:'#ffffff'},
    {name:"Спеціалізований",color:'#0000ff',secondColor:'#ffff00'}]
export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat('ua', options);
    return formatter.format(date).replace(/(\d+)\.(\d+)\.(\d+),/, '$1.$2.$3');
}