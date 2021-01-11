const sortAsc = (a,b,accessor) => {
    if(a[accessor] > b[accessor]) return 1;
    else if(a[accessor] < b[accessor]) return -1;
    else return 0;
};

const sortDesc = (a,b,accessor) => {
    if(a[accessor] > b[accessor]) return -1;
    else if(a[accessor] < b[accessor]) return 1;
    else return 0;
}

export {
    sortAsc,
    sortDesc
}