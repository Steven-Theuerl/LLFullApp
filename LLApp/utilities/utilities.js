import { useRef, useEffect } from "react";

export function getSectionListData(data) {
    let newArray = [];
    data.map(item => {
        let object = newArray.find(
            v =>
            v.name == item.category.charAt(0).toUpperCase() + item.category.slice(1)
        );
        if (object) {
            newArray[newArray.indexOf(object)].data.push({
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
            });
        } else {
            newArray.push({
                name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
                data: [
                    {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        image: item.image,
                    },
                ],
            });
        }
    });
    return newArray;
}

export function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.currect) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}