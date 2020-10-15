import { FASTDesignSystemProvider } from "../design-system-provider";
import { STORY_RENDERED } from "@storybook/core-events";
import addons from "@storybook/addons";
import DataGridTemplate from "./fixtures/base.html";
import { html } from "@microsoft/fast-element";
import {
    DataGrid,
    DataGridCell,
    DataGridColumn,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridRow,
} from "@microsoft/fast-foundation";
import { FASTButton } from "../button";
import { FASTDataGrid } from "./";

// Prevent tree-shaking
FASTDataGrid;
FASTDesignSystemProvider;

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
    if (name.toLowerCase().startsWith("data-grid")) {
        const defaultGrid: DataGrid | null = document.getElementById(
            "defaultGrid"
        ) as DataGrid;
        if (defaultGrid !== null) {
            defaultGrid.columnsData = baseColumns;
            defaultGrid.rowsData = dataRows;
        }
    }

    const defaultGridRow: DataGridRow | null = document.getElementById(
        "defaultGridRow"
    ) as DataGridRow;
    if (defaultGridRow !== null) {
        defaultGridRow.columnsData = baseColumns;
        defaultGridRow.rowData = dataGridRow3;
    }

    const defaultRow: DataGridRow | null = document.getElementById(
        "defaultRow"
    ) as DataGridRow;
    if (defaultRow !== null) {
        defaultRow.columnsData = baseColumns;
        defaultRow.rowData = dataGridRow1;
    }

    const defaultHeader: DataGridHeader | null = document.getElementById(
        "defaultHeader"
    ) as DataGridHeader;
    if (defaultHeader !== null) {
        defaultHeader.columnsData = baseColumns;
    }

    const rowWithCellTemplate: DataGridRow | null = document.getElementById(
        "cellTemplateRow"
    ) as DataGridRow;
    if (rowWithCellTemplate !== null) {
        rowWithCellTemplate.columnsData = templateColumns;
        rowWithCellTemplate.rowData = dataGridRow1;
    }

    const headerWithCellTemplate: DataGridHeader | null = document.getElementById(
        "headerTemplateRow"
    ) as DataGridHeader;
    if (headerWithCellTemplate !== null) {
        headerWithCellTemplate.columnsData = templateColumns;
    }

    const defaultCell: DataGridCell | null = document.getElementById(
        "defaultCell"
    ) as DataGridCell;
    if (rowWithCellTemplate !== null) {
        defaultCell.columnData = { columnDataKey: "name", columnWidth: "1fr" };
        defaultCell.rowData = dataGridRow1;
    }

    const headerCell: DataGridHeaderCell | null = document.getElementById(
        "headerCell"
    ) as DataGridHeaderCell;
    if (rowWithCellTemplate !== null) {
        headerCell.columnData = {
            columnDataKey: "name",
            columnWidth: "1fr",
            title: "Name",
        };
    }
});

export default {
    title: "Data grid",
};

function incrementAge(): void {
    const newRow = Object.assign({}, editRow);
    newRow["age"] = newRow["age"] + 1;

    editRow = newRow;

    // const rowWithCellTemplate: DataGridRow | null = document.getElementById(
    //     "cellTemplateRow"
    // ) as DataGridRow;
    // if (rowWithCellTemplate !== null) {
    //     rowWithCellTemplate.rowData = newRow;
    // }

    dataRows.shift();
    dataRows.unshift(newRow);
    // dataRows.push(newRow);
    // dataRows.splice(0,1, newRow);

    // const defaultGrid: DataGrid | null = document.getElementById(
    //     "defaultGrid"
    // ) as DataGrid;
    // if (defaultGrid !== null) {
    //     defaultGrid.rowsData = dataRows;
    // }

    // const newRow: object = { ...dataGridRow1 };
    // newRow["age"] = newRow["age"] + 1;
    // const rowWithCellTemplate: DataGridRow | null = document.getElementById(
    //     "cellTemplateRow"
    // ) as DataGridRow;
    // if (rowWithCellTemplate !== null) {
    //     rowWithCellTemplate.rowData = newRow;
    // }
    // dataGridRow1 = newRow;
}

const buttonCellTemplate = html<DataGridCell>`
    <template>
        <fast-button @click="${x => incrementAge()}">
            ${x =>
                x.rowData === null ||
                x.columnData === null ||
                x.columnData.columnDataKey === null
                    ? null
                    : x.rowData[x.columnData.columnDataKey]}
        </fast-button>
    </template>
`;

const buttonHeaderCellTemplate = html<DataGridHeaderCell>`
    <template>
        <fast-button @click="${x => incrementAge()}">
            ${x =>
                x.columnData === null
                    ? null
                    : x.columnData.title === undefined
                    ? x.columnData.columnDataKey
                    : x.columnData.title}
        </fast-button>
    </template>
`;

const baseColumns: DataGridColumn[] = [
    { columnDataKey: "name", columnWidth: "1fr" },
    { columnDataKey: "age", columnWidth: "1fr" },
];

function getFocusTarget(cell: DataGridCell | DataGridHeaderCell): HTMLElement {
    return cell.querySelector("fast-button") as HTMLElement;
}

const templateColumns: DataGridColumn[] = [
    { columnDataKey: "name", columnWidth: "1fr" },
    {
        columnDataKey: "age",
        columnWidth: "1fr",
        cellTemplate: buttonCellTemplate,
        cellFocusTargetCallback: getFocusTarget,
        headerCellTemplate: buttonHeaderCellTemplate,
        headerCellFocusTargetCallback: getFocusTarget,
    },
];

const dataGridRow1: object = { name: "bob", age: 21 };
const dataGridRow2: object = { name: "rob", age: 22 };
const dataGridRow3: object = { name: "bobby", age: 23 };

let editRow: object = dataGridRow1;

const dataRows: object[] = [dataGridRow1, dataGridRow2];

export const base = () => DataGridTemplate;