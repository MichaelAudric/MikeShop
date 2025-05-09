import React from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex, Button } from "@chakra-ui/react";
import {useInfiniteQuery, useQuery} from "react-query";
import {fetchProductList, fetchPreferences, fetchOrders} from "../../api.js";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      } else {
        return allGroups.length + 1;
      }
    },
  });

  const { isLoading, isError, data : data2, error : error2 } = useQuery(
      "preferences",
      fetchPreferences,
  );

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      <div className="products">
        <Grid templateColumns="repeat(3,1fr)" gap={4}>
          {data.pages.map((group, i) => {
            // Sort products by similarity to user preference
            const sortedGroup = [...group].sort((a, b) => {
              const aMatch = a.category === data2?.category ? 1 : 0;
              const bMatch = b.category === data2?.category ? 1 : 0;
              return bMatch - aMatch; // match first
            });

            return (
                <React.Fragment key={i}>
                  {sortedGroup.map((item) => (
                      <Box w="100%" key={item._id}>
                        <Cards item={item} />
                      </Box>
                  ))}
                </React.Fragment>
            );
          })}
        </Grid>
      </div>
      <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
