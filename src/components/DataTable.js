import { Table, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

function DataTable({
  data,
  columns,
  onDelete,
  onEdit,
  searchable,
  filterable,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const filteredData = data.filter((item) => {
    // Apply search
    if (searchTerm) {
      const matches = columns.some((column) => {
        const value = column.render ? column.render(item) : item[column.key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (!matches) return false;
    }

    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value && item[key] !== value) return false;
    }

    return true;
  });

  const getFilterOptions = (key) => {
    const uniqueValues = new Set();
    data.forEach((item) => uniqueValues.add(item[key]));
    return Array.from(uniqueValues).sort();
  };

  return (
    <div>
      {(searchable || filterable) && (
        <div className="mb-3 p-3 bg-light rounded">
          {searchable && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {filterable && (
            <div className="row g-2">
              {columns
                .filter((col) => col.filterable)
                .map((column) => (
                  <div key={column.key} className="col-md-3">
                    <select
                      className="form-select"
                      value={filters[column.key] || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [column.key]: e.target.value || undefined,
                        }))
                      }
                    >
                      <option value="">All {column.header}</option>
                      {getFilterOptions(column.key).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.header}</th>
              ))}
              {(onDelete || onEdit) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={`${item.id}-${column.key}`}>
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                {(onDelete || onEdit) && (
                  <td>
                    {onEdit && (
                      <Link to={`/students/edit/${item.id}`}>
                        <Button variant="primary" size="sm" className="me-2">
                          Edit
                        </Button>
                      </Link>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
