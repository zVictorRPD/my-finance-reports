import { Row } from "@tanstack/react-table";
import dayjs from "dayjs";

export const customAlphabeticalTableSort = <TData>(
    rowA: Row<TData>,
    rowB: Row<TData>,
    columnId: string
): number => {
    const valueA = rowA.getValue(columnId) as string;
    const valueB = rowB.getValue(columnId) as string;

    return valueA
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .localeCompare(
            valueB
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
        );
};

export const customDateTableSort = <TData>(
    rowA: Row<TData>,
    rowB: Row<TData>,
    columnId: string
): number => {
    const valueA = rowA.getValue(columnId) as string;
    const valueB = rowB.getValue(columnId) as string;
    const [dayA, monthA, yearA] = valueA.split("/");
    const [dayB, monthB, yearB] = valueB.split("/");

    const formattedValueA = `${yearA}-${monthA}-${dayA}`;
    const formattedValueB = `${yearB}-${monthB}-${dayB}`;

    return dayjs(formattedValueA).isBefore(dayjs(formattedValueB)) ? -1 : 1;
};

export const customValueTableSort = <TData>(
    rowA: Row<TData>,
    rowB: Row<TData>,
    columnId: string
): number => {
    const valueA = rowA.getValue(columnId) as string;
    const valueB = rowB.getValue(columnId) as string;
    const formattedValueA = parseFloat(
        valueA.replace("R$", "").replace(".", "").replace(",", ".").trim()
    );
    const formattedValueB = parseFloat(
        valueB.replace("R$", "").replace(".", "").replace(",", ".").trim()
    );
    return formattedValueA - formattedValueB;
};
