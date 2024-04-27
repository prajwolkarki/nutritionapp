
import notFoundImage from './../assets/notfound.png'; // replace with the path to your image

const NotFound = () => {
    return (
        <div className="not-found container">
            <h1>404</h1>
            <p>Page Not Found</p>
            <img src={notFoundImage} alt="Not Found" />
        </div>
    );
}

export default NotFound;