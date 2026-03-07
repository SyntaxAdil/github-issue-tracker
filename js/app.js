// filter btn
const btnGroup = document.querySelector(".btn-grp");
const sectionContainer = document.querySelector(".sections-container");
const issueCount = document.getElementById("issue-count");
const issues = {
  all: [],
  open: [],
  closed: [],
};

btnGroup.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  const target = btn.dataset.target;
  if (!target) return;
  for (let btn of btnGroup.children) {
    btn.classList.remove("filter_btn_active");
  }
  btn.classList.add("filter_btn_active");
  for (let section of sectionContainer.children) {
    section.classList.add("hidden");
  }

  const targetId = document.getElementById(target);
  if (targetId) {
    targetId.classList.remove("hidden");
    updateIssueCount(issues[target]);
  }
});

// functions

// issue count
function updateIssueCount(target) {
  issueCount.textContent =
    target.length < 10 && target.length > 0
      ? "0" + target.length
      : target.length;
}

async function fetchIssues(end, target) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/${end || "issues/"}`,
  );
  const json = await res.json();
  const data = await json.data;
  issues.all.push(...data);
  renderData("all", issues.all);
  issues.open = issues.all.filter((issue) => issue.status === "open");
  issues.closed = issues.all.filter((issue) => issue.status === "closed");
  renderData("open", issues.open);
  renderData("closed", issues.closed);
  updateIssueCount(issues[target] || issues.all);
}
fetchIssues();

function renderData(container, target) {
  const priorityClass = {
    high: "badge-error",
    medium: "badge-warning",
    low: "badge-ghost",
  };
  const labelsWithClass = {
    bug: "badge-error border-error",
    "help wanted": "badge-warning border-warning",
    enhancement: "badge-success border-success",
    "good first issue": "badge-secondary border-secondary",
    documentation: "badge-info border-info",
  };

  const parentContainer = document.getElementById(container);

  parentContainer.innerHTML = target
    .map((issue) => {
      return ` <div class="bg-white rounded-md border-t-3 ${issue.status === "open" ? "border-success" : "border-purple-500"} hover:-translate-y-2 transition-all duration-200 hover:shadow">
            <div class="px-4 pt-4 h-fit">
              <div class="flex items-center justify-between mb-3 ">
                <img src="./assets/${issue.status}-status.png" alt="open"  />
                <div
                  class="badge ${priorityClass[issue.priority]} badge-soft uppercase px-6 font-medium"
                >
                  ${issue.priority}
                </div>
              </div>
              <h2 class="text-sm font-semibold text-black">
                ${issue.title}
              </h2>
              <p class="my-2 text-[12px] text-[#64748b]">
                ${issue.description}
              </p>
              <!-- badges -->   
              <div class="my-3 flex gap-2 flex-wrap">
                 ${issue.labels.map(
                   (label) =>
                     `<div class="badge w-fit ${labelsWithClass[label] || "bg-fuchsia-50 border-fuchsia-400"} badge-soft px-2 font-semibold uppercase  rounded-full">

                  <img src="./assets/${label}.png" class="w-3 h-3" />
                  <span class="-ms-1">${label}</span>
                </div>`,
                 ).join("")}
              </div>
            </div>
            <div class="divider my-0"></div>

            <div class="px-4 pb-4 pt-2 ">
                <p class="text-[#64748b] text-[12px]">#${issue.author}</p>
                <p class="text-[#64748b] text-[12px]">${issue.createdAt}</p>
            </div>
          </div>


`;
    })
    .join("");
}

updateIssueCount(issues["all"]);
