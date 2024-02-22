import { useState } from "react";
import DropDownMenu from './DropDownMenu';

function NavBar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(!open)};

    return (
        <div className="col-12">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand"  href="/">My Shop</a>
            <button className="navbar-toggler" type="button" onClick={handleOpen} data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {open ? <DropDownMenu></DropDownMenu> : null}
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link active" href="/">Home</a>
                    <a className="nav-link" href="/">Features</a>
                    <a className="nav-link" href="/">Pricing</a>
                    <a className="nav-link disabled"  href="/">Disabled</a>
                </div>
            </div>
        </nav>
        </div>
    )
}

export default NavBar;