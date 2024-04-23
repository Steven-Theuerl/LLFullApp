import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little-lemon');

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(
                    "create table if not exists menuItems (id integer primary key not null, name text, price text, description text, image text, category text);"
                );
            },
            reject,
            resolve
        );
    });
}

export async function getMenuItems() {
    return new Promise(resolve => {
        db.transaction(tx => {
            tx.executeSql("select * from menuItems", [], (_, { rows }) => {
                resolve(rows._array);
            });
        });
    });
}

export function saveMenuItems(menuItems) {
    db.transaction(tx => {
        tx.executeSql(
            `insert into menuItems (id, name, price, description, image, category) values ${menuItems.map(
                item =>
                `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.image}", "${item.category}")`
            ).join(", ")}`
        );
    });
}

export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `select * from menuitems where name like ? and category in ('${activeCategories.join(
                "','"
            )}')`,
            [`%${query}%`],
            (_, { rows }) => {
                resolve(rows._array);
            }
        );
        }, reject);
    });
}