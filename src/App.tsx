import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "./hooks/fetchCities";
import { z } from "zod";
import {
  flexRender,
} from "@tanstack/react-table";
import { Filter } from "./components/Filter";
import { useCitiesTable } from "./hooks/useCitiesTable";

const CitySchema = z.object({
  uuid: z.string(),
  kreis_name: z.string(),
  kreis_schluessel: z.string(),
  gemeindeverband_name: z.string(),
  gemeindeverband_schluessel: z.string(),
  gemeinde_name: z.string(),
  gemeinde_schluessel: z.string(),
  gemeindeteil_name: z.string(),
  gemeindeteil_schluessel: z.string(),
  strasse_name: z.string(),
  strasse_schluessel: z.string(),
  hausnummer: z.number(),
  hausnummer_zusatz: z.string().nullable(),
  postleitzahl: z.string(),
  vergabedatum: z.string(),
});

const CitiesSchema = z.array(CitySchema);

export type City = z.infer<typeof CitySchema>;

function App() {
  const { data, isSuccess } = useQuery({
    queryKey: ["RostockCities"],
    queryFn: fetchCities,
  });

  const table = useCitiesTable(data);

  return (
    <>
      {isSuccess && (
        <div className="p-2">
          <div className="h-2" />
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

