import React from 'react';
import './SearchResults.sass';

interface SearchResultsTypes {
  params: any;
}

const SearchResults: React.FC<{ match: SearchResultsTypes }> = ({ match }) => {
  console.log(match.params);
  return (
    <div>
      <ul>
        <li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae
          dolore a consequuntur obcaecati accusamus fugiat ex iure suscipit
          repudiandae non, asperiores optio facere quam aperiam enim voluptates
          esse atque ut?
        </li>
        <li>
          Veniam expedita nam quaerat. Explicabo veritatis alias nisi
          consectetur nobis maxime quos, amet dolore iusto ipsa. Optio neque
          sunt maiores magni nemo recusandae quasi et, voluptatem, quia qui
          adipisci sapiente?
        </li>
        <li>
          Suscipit ipsam magnam numquam at provident tempore sunt magni! Eius
          beatae nisi perferendis nam natus dolore neque sequi eum excepturi
          tenetur quaerat est similique soluta rem quae, in fugit sapiente!
        </li>
        <li>
          Deserunt odio sit tempore aperiam quo voluptatum nobis commodi dolorum
          cum, quibusdam sint laborum molestias praesentium veritatis ullam
          labore iusto fuga quam asperiores? Deserunt fugit ullam sed? Rerum,
          vero nostrum.
        </li>
        <li>
          Cumque dolore cum saepe voluptatibus, velit facere facilis alias,
          tempora a quae tempore omnis laboriosam tenetur numquam officia
          corporis soluta quisquam provident explicabo, sapiente nam. Pariatur
          amet excepturi deleniti laudantium!
        </li>
        <li>
          Eius accusamus nulla sequi culpa, vitae ex impedit esse, corporis
          porro autem incidunt iste tenetur laborum rem facere illo officia!
          Sint, atque. Tenetur blanditiis explicabo eum sed perspiciatis
          corporis quos?
        </li>
        <li>
          Alias minima quaerat molestiae eligendi, earum libero cupiditate
          veniam delectus id? Nihil accusantium aspernatur in consectetur dicta
          veniam doloremque at. Deleniti molestias, dicta illo sequi eius
          cupiditate autem dignissimos laborum.
        </li>
        <li>
          Doloribus repudiandae voluptatibus deleniti! Optio dolores accusamus
          expedita placeat saepe ducimus numquam quo animi, maiores obcaecati
          necessitatibus eaque labore quas corrupti hic vitae minima. Enim
          obcaecati consectetur magni maxime libero!
        </li>
        <li>
          Modi nemo quas reprehenderit sed dicta neque aliquam exercitationem
          alias cumque amet dolores facilis nesciunt delectus voluptatum veniam
          perferendis in unde fugiat enim, minus ut soluta rerum nostrum.
          Mollitia, eius!
        </li>
        <li>
          Voluptatem porro voluptas itaque ut. Tempore deleniti expedita facere
          harum praesentium aliquid quis perferendis voluptatibus quam iste. Hic
          error molestiae repellendus reprehenderit in dolorem fugiat!
          Exercitationem consequuntur provident odio aliquam.
        </li>
      </ul>
    </div>
  );
};

export default SearchResults;
