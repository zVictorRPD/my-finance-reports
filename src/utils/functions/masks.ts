// string DD/MM/YYYY to YYYY-MM-DDT00:00:00.000Z
export function maskDateWithoutHours(date: string) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}T00:00:00`;
}

// string DD/MM/YYYY HH:mm to YYYY-MM-DDTHH:mm:00.000Z
export function maskDateWithHours(date: string) {
    const [day, month, year] = date.split("/");
    const formattedYear = year.split(" ")[0];
    return `${formattedYear}-${month}-${day}T${date.split(" ")[1]}:00`;
}