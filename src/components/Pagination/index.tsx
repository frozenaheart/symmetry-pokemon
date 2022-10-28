import { useContext, useMemo } from "react";
import { PokemonContext } from "../../context/PokemonProvider";
import _ from 'lodash';
import { Button, Flex } from "@chakra-ui/react";

const paginationCount = 10;

const Pagination = () => {
  const {page, setPage, countPerPage, totalCount} = useContext(PokemonContext);

  const totalPage = useMemo(() => Math.ceil(totalCount / countPerPage), [countPerPage, totalCount]);

  const pages = useMemo(() => {
    if (totalPage <= paginationCount) return _.range(1, totalPage + 1);

    if (page < paginationCount - 1) return [..._.range(1, paginationCount - 1), paginationCount - 1, totalPage];

    if (page > totalPage - paginationCount + 2) return [1, ..._.range(totalPage - paginationCount + 2, totalPage + 1)]

    const oneSide = ~~((paginationCount - 3) / 2);

    return [1, ..._.range(page - oneSide - 1, page + paginationCount - 3 - oneSide), totalPage];
  }, [page, totalPage]);

  if (totalCount === 0) {
    return <></>;
  }

  return (
    <Flex justifyContent='center' gap='20px'>
     {pages?.map((item, index) => (
      <Button bgColor={item === page ? 'blue.300' : 'Background'} key={item} onClick={() => setPage(item)}>{index === 0 || index === pages.length - 1 || pages[index + 1] - pages[index - 1] === 2 ? item : '...'}</Button>
     ))}
    </Flex>
  )

}

export default Pagination;