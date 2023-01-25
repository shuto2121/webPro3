import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Cute Animals Images</h1>
          <h2>日本大学文理学部情報科学科　Webプログラミング第14回課題</h2>
          <h2>5421033 竹之内脩人</h2>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
     return (
       <div className="card">
         <div className="card-image">
           <figure className="image">
           <img src={props.src} alt="cute animal!" />
           </figure>
         </div>
       </div>
     );
}

function Loading() {
   return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
         <div key={url} className="column is-3">
           <Image src={url} />
         </div>
        );
     })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
  <div>
    <form onSubmit={handleSubmit}>
      <div className="field has-addons">
       <div className="control is-expanded">
        <div className="select is-fullwidth">
         <select name="breed" defaultValue="cats">
           <option value="shibes">shibes</option>
           <option value="birds">birds</option>
           <option value="cats">cats</option>
         </select>
        </div>
       </div>
      <div className="control">
       <button type="submit" className="button is-dark">
         Reload
       </button>
      </div>
     </div>
    </form>
   </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("cats").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section className="section">
        <div className="container">
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
        <Gallery urls={urls} />
        </div>
      </section>
    </main>
    
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>shibe,cat,bird images are retrieved from shibes API</p>
        <p>
          <a href="https://shibe.online">Donate to shibe.online API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;