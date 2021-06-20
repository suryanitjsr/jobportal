import React, { useEffect, useState } from "react";
import Header from "./Header";
function Home() {
  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>The Job Portal</h1>
        <p>- developed by Surya</p>
      </div>
    </div>
  );
}

export default Home;