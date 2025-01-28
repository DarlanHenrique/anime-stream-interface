import "../css/Footer.css";
import logo from '../assets/logo/Net_Prime_Plus_Max_Flix.png';

interface FooterProps {
    year: number;
}

export default function Footer({year}: FooterProps) {
    return (
        <footer className="footer mt-5">
            <div className="container">
                <div className="">
                    <div className="col-12 font-medium text-center text-gray-100 fs-4">
                        <img className="logo" src={logo} alt="Disney Statz" />
                    </div>
                    <div className="col-12 font-medium text-center">
                        <ul className="list-unstyled d-flex justify-content-center fs-6">
                            <li className="text-white">© {year} Disney Statz. All Rights Reserved.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    );

}