"use client";

import AddFindingModal from "@/components/AddFindingModal/AddFindingModal";
import AddHypothesisModal from "@/components/AddHypothesisModal/AddHypothesisModal";
import Finding from "@/components/Finding/Finding";
import Hypothesis from "@/components/Hypothesis/Hypothesis";
import { useUserContext } from "@/contexts/AuthContextProvider";
import { useGetFindings } from "@/hooks/useGetFindings/useGetFindings";
import { useGetHypothesis } from "@/hooks/useGetHypothesis/useGetHypothesis";
import { FC, useCallback, useEffect, useState } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const { getHypothesis } = useGetHypothesis();
  const { getFindings } = useGetFindings();
  const { user } = useUserContext();
  const [error, setError] = useState<undefined | "fetch-error">();

  const getItems = useCallback(async () => {
    const { data: hypotheses, err: hypothesisErr } = await getHypothesis();
    const { data: findings, err: findingsErr } = await getFindings();

    if (hypothesisErr || findingsErr) {
      setError("fetch-error");
      return;
    }
    setError(undefined);

    const hypohtesisList: Item[] = hypotheses.map((item: Hypothesis) => ({
      ...item,
      type: "hypothesis",
    }));
    const findingsList: Item[] = findings.map((item: Finding) => ({
      ...item,
      type: "finding",
    }));
    const itemList: Item[] = [...hypohtesisList, ...findingsList].sort(
      (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
    );
    setItems(itemList);
    return itemList;
  }, [getFindings, getHypothesis]);

  useEffect(() => {
    getItems();
    // setItems([...hypo])
  }, [getItems]);

  const [showAddHypothesisModal, setShowAddHypothesisModal] = useState(false);
  const [showAddFindingModal, setShowAddFindingModal] = useState(false);
  const handleCloseHypothesis = () => setShowAddHypothesisModal(false);
  const handleCloseFinding = () => setShowAddFindingModal(false);

  return (
    <div className="mt-[3vh] min-h-screen">
      {user && (
        <div className="space-x-2 flex justify-end mt-5 mr-[7vh] 2xl:mr-[5vh] my-[3vh]">
          <button
            className="bg-gray-600 hover:bg-gray-500 transition transition-duration-50 rounded px-4 py-3"
            onClick={() => setShowAddHypothesisModal(true)}
          >
            + Hypothesis
          </button>
          <button
            onClick={() => setShowAddFindingModal(true)}
            className="bg-gray-600 hover:bg-gray-500 transition transition-duration-50 rounded px-4 py-3"
          >
            + Finding
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {error && (
          <div className="p-5 bg-red-400 mt-[5vh]">
            Oh, something went wrong... try refreshing the page.
          </div>
        )}
        {!error && items.length === 0 && <h1>Oh, nothing to see here... </h1>}
        {items.map((item) => (
          <>
            {item.type === "hypothesis" && (
              <Hypothesis key={item.id} hypothesis={item as Hypothesis} />
            )}
            {item.type === "finding" && (
              <Finding key={item.id} finding={item as Finding} />
            )}
          </>
        ))}
        {/* <Finding finding={generateDummyFinding()} />
        <Finding finding={generateDummyFinding()} />
        <Finding finding={generateDummyFinding()} /> */}
      </div>
      <AddHypothesisModal
        refreshHypothesis={getItems}
        isVisible={showAddHypothesisModal}
        onClose={handleCloseHypothesis}
      />
      <AddFindingModal
        refreshItems={getItems}
        isVisible={showAddFindingModal}
        onClose={handleCloseFinding}
      />
    </div>
  );
};

export default Page;
