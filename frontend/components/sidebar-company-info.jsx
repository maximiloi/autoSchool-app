export default function SidebarCompanyInfo({ company }) {
  return (
    <>
      <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
        <company.logo className='size-4' />
      </div>
      <div className='grid flex-1 text-left text-l leading-tight'>
        <span className='truncate font-semibold'>{company.name}</span>
      </div>
    </>
  );
}
