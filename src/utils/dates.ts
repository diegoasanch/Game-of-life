export const getDateLabel = (date: Date) : string => {
    if (typeof date === 'string')
        date = new Date(date)
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
}
