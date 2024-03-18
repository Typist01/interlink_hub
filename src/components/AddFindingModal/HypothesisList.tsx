import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { generateDummyHypothesis } from "../Hypothesis/HypothesisModal/Responses/sampleResponses";

interface HypothesisListProps {
  hypothesisTitle?: string;
  setSelectedHypothesis: Dispatch<SetStateAction<Hypothesis | undefined>>;
}

const HypothesisList: FC<HypothesisListProps> = ({
  hypothesisTitle,
  setSelectedHypothesis,
}) => {
  const handleClick = (hypothesis: Hypothesis) => {
    console.log("handle click called with ", hypothesis);
    setSelectedHypothesis(hypothesis);
  };
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);

  const fetchFindings = useCallback(async () => {
    if (!hypothesisTitle) {
      setHypotheses([]);
      return;
    }
    if (hypothesisTitle.length > 1) {
      const result = await fetch("/api/hypothesis/list?q=" + hypothesisTitle);
      if (result.ok) {
        const data = await result.json();
        setHypotheses(data.hypotheses);
      }
    }
  }, [hypothesisTitle]);

  // find findings on each keystroke (with clean up)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchFindings();
    }, 200);

    return () => clearTimeout(timeout);
  }, [fetchFindings, hypothesisTitle]);

  return (
    <div className="z-10 max-h-[10rem] mt-2">
      <ul className="border border-gray-300 border-t-0 rounded max-h-[20rem] overflow-auto ">
        {hypotheses.length > 0 &&
          hypotheses.map((item, index) => (
            <li
              onMouseDown={() => {
                console.log("calling handle click with", item);
                handleClick(item);
              }}
              className="overflow-hidden text-gray-600 hover:text-gray-700 border border-gray-300 first:border-t-0 bg-white py-1 px-2 text-[1.5rem] font-medium hover:bg-gray-50 cursor-pointer"
              key={index}
            >
              <span className="block truncate">{item.title}</span>
              <span className="ml-3 text-[1.3rem]">by {item.user.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HypothesisList;
