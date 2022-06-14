export default function sortByDate(arr){
    return arr.sort((item1, item2) => {
        return new Date(item2.createdAt) - new Date(item1.createdAt);
    })
}