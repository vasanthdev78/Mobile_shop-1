import React from "react";

export default function index() {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <ul className="footer-text text-center">
              <li>
                <p className="mb-0">
                  Copyright © {new Date().getFullYear()} SD Tiles. All rights
                  reserved 💖
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
