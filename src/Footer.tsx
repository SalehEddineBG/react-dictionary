function Footer() {
    return (
        <>
            <footer className="text-center  bg-info text-light fixed-bottom" data-testid="footer-component">
                <p className="p-2"><strong>Created with love <span className='text-danger' title='heart'>&#9829;</span></strong></p>
            </footer>
        </>
    );
}
export { Footer };
export default Footer;