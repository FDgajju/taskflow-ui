import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import HeadingCard from "../components/HeadingCard";
import { LuClipboardList } from "react-icons/lu";
import type { TaskT } from "../types/task";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { apiEndpoint } from "../constants/env";
import toast from "react-hot-toast";
import ButtonLink from "../components/ButtonLink";

const TaskDetails = () => {
  const [data, setData] = useState<Partial<TaskT>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  const taskDetails = useMemo<Partial<TaskT> | null>(() => data, [data]);

  const fetchData = useCallback(async () => {
    try {
      const resp = await axios(`${apiEndpoint}/task/${id}`);
      if (String(resp.status).startsWith("2")) setData(resp.data.data);
      else if (String(resp.status).startsWith("4"))
        toast.error(resp.data.error);
      else toast.error("Something unexpected happen, please contact admin!");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        toast.error("An unknown error occurred, please contact admin!");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData();
    return () => controller.abort();
  }, [id, fetchData]);

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {loading && <span>Loading...</span>}
      {!loading && (
        <div className="w-3/4 p-4 flex flex-col">
          {/* heading */}
          <div className="flex justify-between align-middle items-center">
            <h2 className=" text-3xl font-bold text-main py-5">Overview</h2>
            <Button type="button" onClick={() => {}} style="bg-btn-secondary">
              <span className="text-btn-primary">Go Back</span>
            </Button>
          </div>

          <div>
            {/* <div className="w-full p-5 bg-secondary-bg rounded-3xl">
            
          </div> */}
            <HeadingCard
              className="flex gap-4"
              highlightText={taskDetails?.status || "todo"}
              heading={taskDetails?.title || "Task Title"}
              text={taskDetails?.description || "Task Description"}
              icon={<LuClipboardList className="text-primary-bg text-2xl" />}
              color={taskDetails?.status || "todo"}
              highlightBg={`status-${taskDetails?.status}-secondary`}
            >
              <ButtonLink
                to={`/task${taskDetails?._id}`}
                type="button"
                onClick={() => {}}
                className="text-primary-bg"
                text="Edit Task"
              />

              <Button
                type="button"
                onClick={() => {}}
                className="bg-status-overdue-secondary text-status-overdue focus:ring-2 focus:ring-status-overdue"
              >
                <span>Delete Task</span>
              </Button>
            </HeadingCard>
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskDetails;
