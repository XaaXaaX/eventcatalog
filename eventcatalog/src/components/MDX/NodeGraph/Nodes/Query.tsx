import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import type { CollectionEntry } from 'astro:content';
import { Handle } from '@xyflow/react';
import MessageContextMenu from './MessageContextMenu';
import { getIcon } from '@utils/badges';
interface Data {
  title: string;
  label: string;
  bgColor: string;
  color: string;
  mode: 'simple' | 'full';
  message: CollectionEntry<'queries'>;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function QueryNode({ data, sourcePosition, targetPosition }: any) {
  const { mode, message } = data as Data;

  const { name, version, summary, owners = [], producers = [], consumers = [], styles } = message.data;
  const { node: { color = 'green', label } = {}, icon = 'MagnifyingGlassIcon' } = styles || {};

  const Icon = getIcon(icon);
  const nodeLabel = label || message?.data?.sidebar?.badge || 'Query';
  const fontSize = nodeLabel.length > 10 ? '7px' : '9px';
  const renderTarget = true;
  const renderSource = true;

  return (
    <MessageContextMenu message={message} messageType="queries">
      <div className={classNames(`w-full rounded-md border flex justify-start  bg-white text-black border-${color}-400`)}>
        <div
          className={classNames(
            `bg-gradient-to-b from-${color}-500 to-${color}-700 relative flex items-center w-5 justify-center rounded-l-sm text-${color}-100`,
            `border-r-[1px] border-${color}-500`
          )}
        >
          {Icon && <Icon className="w-4 h-4 opacity-90 text-white absolute top-1 " />}
          {mode === 'full' && (
            <span
              className={`rotate -rotate-90 w-1/2 text-center absolute bottom-1 text-[${fontSize}] text-white font-bold uppercase tracking-[3px] `}
            >
              {nodeLabel}
            </span>
          )}
        </div>
        <div className="p-1 min-w-60 max-w-[min-content]">
          {renderTarget && <Handle type="target" position={targetPosition} />}
          {renderSource && <Handle type="source" position={sourcePosition} />}
          <div className={classNames(mode === 'full' ? `border-b border-gray-200` : '')}>
            <span className="text-xs font-bold block pb-0.5">{name}</span>
            <div className="flex justify-between">
              <span className="text-[10px] font-light block pt-0.5 pb-0.5 ">v{version}</span>
              {mode === 'simple' && (
                <span className="text-[10px] text-gray-500 font-light block pt-0.5 pb-0.5 ">{nodeLabel}</span>
              )}
            </div>
          </div>
          {mode === 'full' && (
            <div className="divide-y divide-gray-200 ">
              <div className="leading-3 py-1">
                <span className="text-[8px] font-light">{summary}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 py-1">
                <span className="text-xs" style={{ fontSize: '0.2em' }}>
                  Producers: {producers.length}
                </span>
                <span className="text-xs" style={{ fontSize: '0.2em' }}>
                  Consumers: {consumers.length}
                </span>
                <span className="text-xs" style={{ fontSize: '0.2em' }}>
                  Owners: {owners.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </MessageContextMenu>
  );
}
