import { FacebookFilled, GithubFilled, YoutubeFilled } from "@ant-design/icons";

export default function Footer() {
  const about = [
    {
      id: 1,
      title: "Resources",
      children: [
        { id: 1, name: "Nasa.gov" },
        { id: 2, name: "Tailwind CSS" },
      ],
    },
    {
      id: 2,
      title: "Follow us",
      children: [
        { id: 1, name: "Github" },
        { id: 2, name: "Discord" },
      ],
    },
    {
      id: 3,
      title: "Legal",
      children: [
        { id: 1, name: "Privacy Policy" },
        { id: 2, name: "Terms & Conditions" },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div className="flex flex-col items-center md:items-start">
            <a
              href="/"
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              <img
                className="dark:invert w-20 h-auto"
                src="/images/logo-Cabaia.svg"
                alt="Cabaia logo"
              />
              <span className="text-2xl font-semibold">CABAIA</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
            {about.map((item) => (
              <div key={item.id}>
                <h2 className="mb-4 text-sm font-semibold uppercase">
                  {item.title}
                </h2>
                <ul className="font-medium space-y-2">
                  {item.children.map((itemChildren) => (
                    <li key={itemChildren.id}>
                      <a href="/#" className="hover:underline">
                        {itemChildren.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-center sm:text-left">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Nasa™
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex gap-5">
            <a href="/" aria-label="Facebook" className="hover:text-gray-300">
              <FacebookFilled />
            </a>
            <a href="/" aria-label="Twitter" className="hover:text-gray-300">
              <YoutubeFilled />
            </a>
            <a href="/" aria-label="Github" className="hover:text-gray-300">
              <GithubFilled />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
