import { memo, useEffect, useState, type FormEvent } from "react";
import { api } from "../../api";

interface Blog {
  id: string;
  title: string;
  avatar?: string;
}

const Main = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [reload, setReload] = useState(true);
  const [updatedData, setUpdatedData] = useState<null | Blog>(null);

  useEffect(() => {
    api.get("/blog").then((res) => {
      setData(res?.data);
    });
  }, [reload]);

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const prod = { title };
    if (!updatedData) {
      api.post("/blog", prod).then(() => {
        setReload((p) => !p);
      });
      setTitle("");
    } else {
      api.put(`blog/${updatedData.id}`, prod).then(() => {
        setReload((p) => !p);
        setUpdatedData(null);
        setTitle("");
      });
    }
  };

  const handleUpdate = (e: Blog) => {
    setUpdatedData(e);
    setTitle(e.title);
  };

  const handleDelete = (id: string) => {
    api.delete(`/blog/${id}`).then(() => {
      setReload((p) => !p);
    });
  };

  return (
    <div className="container">
      <h2>Blog</h2>
      <form onSubmit={handleSubmit} className="flex items-center " action="">
        <input
          className="border border-gray-300 outline-0 focus:ring-2 focus:ring-blue-400 "
          style={{
            height: "50px",
            width: "200px",
            textIndent: "10px",
            fontSize: "25px",
            borderRadius: "10px",
            marginRight: "20px",
          }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {updatedData ? (
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              paddingLeft: "30px",
              paddingRight: "30px",
              borderRadius: "10px",
            }}
          >
            save
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              paddingLeft: "30px",
              paddingRight: "30px",
              borderRadius: "10px",
            }}
          >
            submit
          </button>
        )}
      </form>

      <div className="wrapper">
        {data?.map((item: Blog) => (
          <div
            key={item.id}
            className="p-[10px] bg-gray-100 flex flex-col gap-[20px]"
          >
            <img className="rounded-2xl" src={item.avatar} alt="" />
            <h3>{item.title}</h3>
            <div className="flex gap-1.5">
              <button
                className="bg-indigo-400 px-[40px] py-[5px] rounded-2xl text-white"
                onClick={() => handleDelete(item.id)}
              >
                delete
              </button>
              <button
                className="bg-indigo-400 px-[40px] py-[5px] rounded-2xl text-white"
                type="button"
                onClick={() => handleUpdate(item)}
              >
                update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Main);
