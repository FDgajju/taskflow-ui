import { useCallback, useEffect, useState } from "react";
import { apiEndpoint } from "../constants/env";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { TaskT } from "../types/task";

const useTaskDetails = (taskId: string) => {
  const [task, setTask] = useState<Partial<TaskT> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await axios(`${apiEndpoint}/task/${taskId}`);
      if (String(resp.status).startsWith("2")) {
        setTask(resp.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        toast.error(resp.data.error || "Could not fetch task");
        navigate("/tasks");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        toast.error("An unknown error occurred!");
      }

      navigate("/tasks");
    }
  }, [taskId, navigate]);

  useEffect(() => {
    if (taskId) fetchData();
  }, [fetchData, taskId]);

  //   delete tsk
  const deleteTask = async () => {
    setDeleting(true);
    try {
      const resp = await axios.delete(`${apiEndpoint}/task/${taskId}`);
      if (String(resp.status).startsWith("2")) {
        toast.success("Task deleted");
        navigate("/tasks");
      } else {
        toast.error(resp.data.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        toast.error("Could not delete task");
      }
    } finally {
      setDeleting(false);
    }
  };

  // add deps
  const addDependency = async (depId: string) => {
    try {
      const depsToBeUpdate = [...(task?.dependsOn || []), depId];
      await axios.patch(`${apiEndpoint}/task/${taskId}`, {
        dependsOn: depsToBeUpdate,
      });
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Could not add dependency");
    }
  };

  // remove deps
  const removeDependency = async (depId: string) => {
    try {
      const depsToBeUpdate = task?.dependsOn?.filter((d) => d !== depId);
      await axios.patch(`${apiEndpoint}/task/${taskId}`, {
        dependsOn: depsToBeUpdate,
      });
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Could not remove dependency");
    }
  };

  return {
    task,
    setTask,
    deleting,
    loading,
    deleteTask,
    addDependency,
    removeDependency,
  };
};

export default useTaskDetails;
