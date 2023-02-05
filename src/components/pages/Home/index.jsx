import { useQuery } from "@apollo/client";
import { GET_HOME_PAGE, HOME_PAGE_UID } from "@/api/queries/home";
import { getChildren } from "@/utils/json-convertor"
import Loader from "@/components/_common/Loader";
import BooksList from "@/components/BooksList";

import './index.css';

const Home = () => {
    const { loading, data } = useQuery(GET_HOME_PAGE, { variables: { uid: HOME_PAGE_UID }} );

    if (loading) return <Loader big />

    const { home_page: { title, page_components } } = data;
    const ch = getChildren(page_components);

      return (
        <div className="App">
          <h2 className="App-header">{ title }</h2>
            {ch}
            <BooksList />
        </div>
      );
}

export default Home;
