import ClientFooterTop from './ClientFooterTop';
import ClientFooterBottom from './ClientFooterBottom';

const ClientFooter = () =>{
    return (
        <footer id="layout-footer" className="leading-[1.5] w-full mt-auto">
            <ClientFooterTop />
            <ClientFooterBottom />
        </footer>
    );
}
export default ClientFooter;