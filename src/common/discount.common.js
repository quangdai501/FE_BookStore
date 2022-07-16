export const discountTypes = [{
        name: "Phần trăm",
        value: "PERCENT",
    },
    {
        name: "Tiền mặt",
        value: "NUMBER",
    },
];
export const userRanks = [{
        name: "Chưa có hạng",
        value: 0,
    },
    {
        name: "Khách Hàng Hạng Bạc",
        value: 1000,
    },
    {
        name: "Khách Hàng Hạng Vàng",
        value: 2000,
    },
    {
        name: "Khách Hàng Hạng Bạch Kim",
        value: 5000,
    },
    {
        name: "Khách Hàng Hạng Kim Cương",
        value: 10000,
    },
];

export const getUserRank = (point) => {
    if (point < 1000) {
        return [userRanks[0], userRanks[1]]
    }

    if (point < 2000) {
        return [userRanks[1], userRanks[2]]
    }

    if (point < 5000) {
        return [userRanks[2], userRanks[3]]
    }

    if (point < 10000) {
        return [userRanks[3], userRanks[4]]
    }

    return [userRanks[4], userRanks[4]]
}

export const convertPointToUserRank = (point) => {
    const rank = userRanks.find(item => item.value === point)
    return rank ? rank.name : userRanks[0].name;
}

export const calculateRankUser = (point) => {
    const [current, next] = getUserRank(point);

    if (point > next.value) {
        return 100;
    }

    const percent = ((point - current.value) / next.value) * 100
    return percent
};